from nltk.tokenize import word_tokenize
import nltk
from nltk.corpus import stopwords
import re
import pickle
import gensim
from gensim import models as gm
import pickle
import numpy as np
from apyori import apriori

nltk.download('stopwords')
nltk.download('punkt')

lda_stop_words = stopwords.words('english')
lda_stop_words.extend(['from', 'subject', 're', 'edu', 'use', 'experience', 'team', 'software', 'development', 'work', 'environment', 'working', 'opportunity'])

# extract all requirements from each job post
def extract_requirements(description, skills):
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(description)
    # nltk processing from https://realpython.com/nltk-nlp-python/

    potential_skill_words = [words[0]]

    for i in range(1, len(words)):
        word = words[i]
        bigram = f'{words[i - 1]}{word}'

        if word.casefold() not in stop_words:
            potential_skill_words.append(word)

        if bigram not in stop_words:
            potential_skill_words.append(bigram)

    all_skills = {}
    for skill, altnames in skills.items():
        all_skills[skill.lower()] = skill
        if altnames:
            for name in altnames:
                all_skills[name] = skill

    requirements = set()
    for word in potential_skill_words:
        if word.lower() in all_skills:
            skill_name = all_skills[word.lower()]
            requirements.add(skill_name)

    return list(requirements)

# make all chars lowercase, remove any chars which are not letters or numbers
def normalize_text(text):
    text = text.strip()
    cleaned_text = ''.join([char.lower() if char.isalnum() else ' ' for char in text])
    normalized_text = ' '.join(cleaned_text.split())
    return normalized_text

# find the years of experience required in each job post description using regular expressions
def get_years_of_experience(description):
    normalized_description = normalize_text(description)

    # 1+ words, 1 or 2 digit number, years, 0-10 words, experience e.g. 3 years of experience
    number_expression = r'(([a-z]+\s){1,10}[0-9]{1,2}\s(year|years)([a-z]*\s){0,10}experience)+'
    # match range from normalized text, e.g. 3-5 years of experience -> 3 5 years of experience
    range_expression = r'(([a-z]+\s){1,10}[0-9]\s[0-9]\syears([a-z]*\s){0,10}experience)+'

    number_matches = re.findall(number_expression, normalized_description)
    range_matches = re.findall(range_expression, normalized_description)

    years = []

    for match in number_matches:
        for s in match:
            years_found = [int(token) for token in s.split() if token.isdigit() and int(token) < 20]
            years.extend(years_found)

    for match in range_matches:
        for s in match:
            years_found = [int(token) for token in s.split() if token.isdigit() and int(token) < 20]
            if years_found:
                average_years = sum(years_found) / len(years_found)
                years.append(round(average_years))

    return years

# based on https://towardsdatascience.com/unsupervised-nlp-topic-models-as-a-supervised-learning-input-cf8ee9e5cf28
# find the type of job posting using nlp and ml e.g. frontend, devops, qa
def vectorize_text(text, lda_model=None ,corpus=None, id2word=None):
    #Load models and data if not provided
    if not lda_model:
        lda_model =  gm.LdaModel.load('./models/lda-model/lda_train.model')
    if not corpus:
        with open('./models/lda-model/data/train_corpus.pkl', 'rb') as f:
            corpus=pickle.load(f)
    if not id2word:
        with open('./models/lda-model/data/train_id2word.pkl', 'rb') as f:
            id2word=pickle.load(f)
    
    processed_text = gensim.utils.simple_preprocess(str(text), deacc=True)
    processed_text = [word for word in processed_text if word not in lda_stop_words]
    token_text = id2word.doc2bow(processed_text)

    #Vectorize description using lda model
    top_topics = lda_model.get_document_topics(token_text, minimum_probability=0.0)
    topic_vec = [top_topics[i][1] for i in range(17)]
    topic_vec = np.array(topic_vec)

    return topic_vec

def get_lda(id_descs):
    # Load corpus data
    with open('./models/lda-model/data/train_corpus.pkl', 'rb') as f:
        corpus=pickle.load(f)
    with open('./models/lda-model/data/train_id2word.pkl', 'rb') as f:
        id2word=pickle.load(f)
    
    #Load LDA Model
    lda_model =  gm.LdaModel.load('./models/lda-model/lda_train.model')

    for i in range(len(id_descs)):
        id_descs[i] = [id_descs[i][0], id_descs[i][1], vectorize_text(id_descs[i][1], lda_model=lda_model, corpus=corpus, id2word=id2word)]

    return id_descs

def get_role_type(title):
    regular_expressions = {
        'software': r'(\bsoftware)',
        'frontend':  r'(\bfrontend)|(\bfront end)|(\bfront-end)',
        'backend':  r'(\bbackend)|(\bback end)|(\bback-end)',
        'fullstack': r'(\bfullstack)|(\bfull stack)|(\bfull-stack)',
        'mobile': r'(\bmobile)|(\bandroid)|(\bios)',
        'devops': r'(\bdevops)|(\bdev ops)|(\breliability)',
        'qa': r'(\bqa)|(\bquality)|(\bassurance)',
        'ds': r'(\bdata)|(\data scientist)|(\bstatistics)',
        'ml': r'(\bml)|(\bmachine learning)|(\bnlp)|(\bai)'
    }
    for position, r_expression in regular_expressions.items():
        match = re.search(r_expression, title, re.IGNORECASE)
        if match:
            return position
    return 'other'

def get_roles(dataset):
    # Number of roles should equal number of clusters
    role_names = {
        'Junior Frontend Developer',
        'Senior Frontend Developer',  
        'Junior Backend Developer',
        'Senior Backend Developer',
        'Junior Full Stack Developer',
        'Full Stack Developer',
        'Senior Full Stack Developer',
        'QA Engineer',
        'Senior QA Engineer',
        'Business Analyst',
        'Development Lead',
        'Software Architect',
        'Product Owner',
        'Project Manager',
        'Devops',
        'Senior Devops',
        'Automation Engineer',
        'Cloud Engineer',
        'Database Admin (DBA)'
    }

    roles = {}
    for role_name in role_names:
        roles[role_name] = [0] * 20

    #Patterns
    fd_p = r'((\bfrontend)|(\bui)|(\bux)|(\bfront end))'
    bd_p = r'(\bbackend)'
    fsd_p = r'(\bfull stack)'
    qa_p = r'(\bqa\b)'
    ba_p = r'(\banalyst)'
    dl_p = r'(\bdevelopment).*(\blead)'
    sa_p = r'((\bsoftware)|(\bsystems)).*(\barchitect)'
    po_p = r'(\bproduct).*(\bowner)'
    pm_p = r'(\bmanager)'
    do_p = r'((\bdevops)|(\bbizops) | (\bdev ops))'
    ae_p = r'(\bautomation).*(\bengineer)'
    ce_p = r'(\bcloud).*(\bengineer)'
    dba_p = r'(((\bdatabase).*(\badmin)) | (\bdba))'
    j_p = r'((\bjunior) | (\bgrad) | (\bintern))'
    s_p = r'(\bsenior)'

    sorted_dataset = sorted(dataset, key=lambda x: x[3])

    # Split the data set based on which cluster they belong to
    split_dataset = {}

    current_cluster_id = 0
    temp_array = []
    for job in  sorted_dataset:
        if current_cluster_id != job[3]:
            split_dataset[current_cluster_id] = temp_array
            temp_array = []
            current_cluster_id = job[3]
        temp_array.append(job)
    split_dataset[current_cluster_id] = temp_array

    # Get the probability that a cluster is a certain role
    for cluster in split_dataset:
        for job in split_dataset[cluster]:
            text = job[2] + " " + job[1]
            #Check frontend
            if re.search(fd_p, text, re.IGNORECASE):
                if re.search(s_p, text, re.IGNORECASE):
                    roles['Senior Frontend Developer'][cluster] += 1
                else:
                    roles['Junior Frontend Developer'][cluster] += 1
            #Check backend
            if re.search(bd_p, text, re.IGNORECASE):
                if re.search(s_p, text, re.IGNORECASE):
                    roles['Senior Backend Developer'][cluster] += 1
                else:
                    roles['Junior Backend Developer'][cluster] += 1
            #Check Full Stack
            if re.search(fsd_p, text, re.IGNORECASE):
                if re.search(s_p, text, re.IGNORECASE):
                    roles['Senior Full Stack Developer'][cluster] += 1
                if re.search(j_p, text, re.IGNORECASE):
                    roles['Junior Full Stack Developer'][cluster] += 1
                else:
                    roles['Full Stack Developer'][cluster] += 1
            #Check QA 
            if re.search(qa_p, text, re.IGNORECASE):
                if re.search(s_p, text, re.IGNORECASE):
                    roles['Senior QA Engineer'][cluster] += 1
                else:
                    roles['QA Engineer'][cluster] += 1
            #Check BA
            if re.search(ba_p, text, re.IGNORECASE):
                roles['Business Analyst'][cluster] += 1
            #Check Dev Lead
            if re.search(dl_p, text, re.IGNORECASE):
                roles['Development Lead'][cluster] += 1
            #Check Software Architect
            if re.search(dl_p, text, re.IGNORECASE):
                roles['Software Architect'][cluster] += 1
            #Check Product Owner
            if re.search(po_p, text, re.IGNORECASE):
                roles['Product Owner'][cluster] += 1
            #Check Project Manager
            if re.search(pm_p, text, re.IGNORECASE):
                roles['Project Manager'][cluster] += 1
            #Check devops
            if re.search(do_p, text, re.IGNORECASE):
                if re.search(s_p, text, re.IGNORECASE):
                    roles['Senior Devops'][cluster] += 1
                else:
                    roles['Devops'][cluster] += 1
            #Check Automation Engineer
            if re.search(ae_p, text, re.IGNORECASE):
                roles['Automation Engineer'][cluster] += 1
            #Check Cloud Engineer
            if re.search(ce_p, text, re.IGNORECASE):
                roles['Cloud Engineer'][cluster] += 1
            #Check DBA
            if re.search(dba_p, text, re.IGNORECASE):
                roles['Database Admin (DBA)'][cluster] += 1
    
    # Normalise the counts so that large clusters are not over represented
    for cluster in split_dataset:
        for role in roles:
            roles[role][cluster] = roles[role][cluster] / len(split_dataset[cluster])

    #Find the pairing with the highest probability,  repeat until all values assigned
    role_map = {}
    used_numbers = []
    for i in range(len(roles)):
        max_role = ''
        max_value=-1
        max_value_index = 0
        for role in roles:
            i = 0
            while i<len(roles[role]):
                if i not in used_numbers and roles[role][i] > max_value:
                    max_role=role
                    max_value=roles[role][i]
                    max_value_index=i
                i+=1
        used_numbers.append(max_value_index)
        role_map[max_value_index] = max_role
        roles.pop(max_role)

    # Convert from numbers to category names
    for job in dataset:
        job[3] = role_map[job[3]]

    return dataset, role_map

def get_rules(dataset, min_support=0.2, min_lift=1.1):
    rules = []
    rules_list = list(apriori(dataset, min_support=min_support, min_lift=min_lift))
    for rule in rules_list:
        lhs = list(rule[0])[:-1]
        rhs = list(rule[0])[-1]

        support = rule[1]
        confidence = rule[2][0][2]
        lift = rule[2][0][3]

        rules.append([lhs, rhs, support, confidence, lift])
    
    return rules
