import streamlit as st
import re
import io
import zipfile
from docx import Document

def clean_line(line):
    line = re.sub(r'!\[\[.*?\]\]', '', line)
    line = re.sub(r'\[\[(.*?)\]\]', r'\1', line)
    return line

def remove_yaml_frontmatter(lines):
    cleaned = []
    inside_yaml = False
    for line in lines:
        if line.strip() == "---":
            inside_yaml = not inside_yaml
            continue
        if not inside_yaml:
            cleaned.append(line)
    return cleaned

def split_large_text(text, max_bytes=2 * 1024 * 1024):
    chunks = []
    current = ""
    for line in text.splitlines(keepends=True):
        if len(current.encode('utf-8')) + len(line.encode('utf-8')) > max_bytes:
            chunks.append(current)
            current = ""
        current += line
    if current:
        chunks.append(current)
    return chunks

def process_file(uploaded_file):
    # Check if it's a .docx file
    if uploaded_file.name.endswith('.docx'):
        # Handle .docx file
        doc = Document(uploaded_file)
        raw_text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        raw_lines = raw_text.splitlines(keepends=True)
    else:
        # Handle text files
        raw_lines = uploaded_file.read().decode("utf-8").splitlines(keepends=True)
    
    lines = remove_yaml_frontmatter(raw_lines)
    cleaned_lines = [clean_line(line) for line in lines]
    full_text = ''.join(cleaned_lines)
    return split_large_text(full_text)

st.title("🧹 Obsidian Markdown Cleaner & Splitter")

uploaded_file = st.file_uploader("Upload your document file", type=["docx"])

if uploaded_file:
    st.info("Processing your file...")

    chunks = process_file(uploaded_file)

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w") as zf:
        for i, chunk in enumerate(chunks):
            filename = f"cleaned_part_{i+1}.md"
            zf.writestr(filename, chunk)
    zip_buffer.seek(0)

    st.success(f"Processed and split into {len(chunks)} file(s).")
    st.download_button(
        label="📦 Download Cleaned ZIP",
        data=zip_buffer,
        file_name="cleaned_output.zip",
        mime="application/zip"
    )