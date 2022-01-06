import spacy

def main():
    nlp = spacy.blank('en')
    s = 'In 1990, more than 60% of people in East Asia were in extreme poverty.' \
        'Now less than 4% are.'
    doc = nlp(s)
    for token in doc:
        print(token)

if __name__ == '__main__':
    main()
