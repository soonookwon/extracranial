from concurrent.futures import process
import shutil
import os

EN_DIR = "./blog"
KO_DIR = "./i18n/ko/docusaurus-plugin-content-blog"
SOURCE_DIR = "./posts"

# first, remove all files in the target directory


def remove_dir(dir):
    if not os.path.isdir(dir):
        return
    # delete all files in the directory
    for file in os.listdir(dir):
        file_path = os.path.join(dir, file)
        if os.path.isfile(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)
    # delete the directory
    os.rmdir(dir)


remove_dir(KO_DIR)
remove_dir(EN_DIR)


# copy all files from the source directory to the target directory
for file in os.listdir(SOURCE_DIR):
    file_path = os.path.join(SOURCE_DIR, file)
    if os.path.isfile(file_path):
        shutil.copy(file_path, KO_DIR)
        shutil.copy(file_path, EN_DIR)
    elif os.path.isdir(file_path):
        shutil.copytree(file_path, os.path.join(KO_DIR, file))
        shutil.copytree(file_path, os.path.join(EN_DIR, file))
    else:
        print("Unknown file type: " + file_path)


def process_english(dir, to_index, to_delete):
    for file in os.listdir(dir):
        file_path = os.path.join(dir, file)
        if os.path.isfile(file_path):
            file_location = os.path.join(dir, file)
            if file.startswith(to_index) and (file.endswith(".md") or file.endswith(".mdx")):
                os.rename(file_location, file_location.replace(
                    to_index + ".md", "index.md").replace(to_index + ".mdx", "index.mdx"))
            elif file.startswith(to_delete) and (file.endswith(".md") or file.endswith(".mdx")):
                print("Deleting: " + file_location)
                os.remove(file_location)
        elif os.path.isdir(file_path):
            process_english(file_path, to_index, to_delete)


process_english(EN_DIR, "en", "ko")
process_english(KO_DIR, "ko", "en")