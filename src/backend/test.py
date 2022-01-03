import PyPDF2
import pdfplumber

def main():
    with pdfplumber.open('resume.pdf') as pdf:
        first_page = pdf.pages[0]
        print(first_page.extract_text())

if __name__ == '__main__':
    main()
