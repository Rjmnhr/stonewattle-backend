import gdown
import pickle
import os
import pandas as pd
import numpy as np
import re
from sklearn.feature_extraction.text import TfidfVectorizer
import json
import sys


def top_4_prediction(input_data):
  
    df = input_data
    with open(r'knn_model_linkedin.pkl', 'rb') as file:
        model = pickle.load(file)

    del df['name']
    
    #------------------------------------------------------------------------------------------------------
    for column in df.columns:
      df[column] = df[column].apply(lambda x: str(x).lower().replace(r'[^\w\s]', ''))
      df[column] = df[column].str.replace(r'fulltime|selfemployed|· self-employed|· full-time', '', flags=re.IGNORECASE).str.strip()
    #------------------------------------------------------------------------------------------------------

    titlecols = [col for col in df.columns if 'title' in col]
    df['all_titles'] = df[titlecols].apply(lambda row: ' '.join(row.dropna().astype(str)), axis=1)#--------------------------------------remove punctuvation
    df.drop(columns=titlecols, inplace=True)

    org_cols = ([col for col in df.columns if 'org' in col])
    df['all_org_cols'] = df[org_cols].apply(lambda row: ','.join(row.dropna().astype(str)), axis=1)
    df.drop(columns=org_cols, inplace=True)

    job_location_cols = [col for col in df.columns if 'location' in col]
    df['all_loc_cols'] = df[job_location_cols].apply(lambda row: ' '.join(row.dropna().astype(str)), axis=1)
    df.drop(columns=job_location_cols, inplace=True)

    institute_cols = [col for col in df.columns if 'institute' in col]
    df['all_instutes'] = df[institute_cols].apply(lambda row: ','.join(row.dropna().astype(str)), axis=1)
    df.drop(columns=institute_cols, inplace=True)

    degree_cols = [col for col in df.columns if 'degree' in col and 'duration' not in col]
    df['all_degree'] = df[degree_cols].apply(lambda row: ' '.join(row.dropna().astype(str)), axis=1)
    df.drop(columns=degree_cols, inplace=True)
    
    comp_emp_count = [col for col in df.columns if 'company' in col and 'emp' in col]            # how big are their company exp's so we are totaling the info.
    df['all_comp_emp_count'] = df[comp_emp_count].sum(axis=1)
    df.drop(columns=comp_emp_count, inplace=True) #not enough data

    comp_ind = [col for col in df.columns if 'company' in col and 'industry' in col]
    df['all_comp_ind'] = df[comp_ind].apply(lambda row: ' '.join(row.dropna().astype(str)), axis=1)
    df.drop(columns=comp_ind, inplace=True)

    #------------------------------------------------------------------------------------------------------
    def vectorize_columns_method1(df, columns_to_vectorize):
        tfidf_vectorizer_method1 = TfidfVectorizer(tokenizer=lambda x: x.split(','))
        job_titles_method1 = df[columns_to_vectorize].apply(lambda row: ','.join(row), axis=1)
        job_title_matrix_method1 = tfidf_vectorizer_method1.fit_transform(job_titles_method1)
        job_title_vector_df_method1 = pd.DataFrame(job_title_matrix_method1.toarray(), columns=tfidf_vectorizer_method1.get_feature_names_out())
        return job_title_vector_df_method1,tfidf_vectorizer_method1

    def vectorize_columns_method2(df, columns_to_vectorize):
        tfidf_vectorizer_method2 = TfidfVectorizer()
        job_titles_method2 = df[columns_to_vectorize].apply(lambda row: ' '.join(row), axis=1)
        job_title_matrix_method2 = tfidf_vectorizer_method2.fit_transform(job_titles_method2)
        job_title_vector_df_method2 = pd.DataFrame(job_title_matrix_method2.toarray(), columns=tfidf_vectorizer_method2.get_feature_names_out())
        return job_title_vector_df_method2,tfidf_vectorizer_method2

    columns_to_vectorize_1 = ['all_org_cols','all_instutes']
    columns_to_vectorize_2 = [ 'all_titles', 'all_loc_cols', 'all_degree', 'all_comp_ind']

    vectorized_df_method1,tfidf_vectorizer_method1 = vectorize_columns_method1(df, columns_to_vectorize_1)
    vectorized_df_method2,tfidf_vectorizer_method2 = vectorize_columns_method2(df, columns_to_vectorize_2)

    # Concatenate the vectorized DataFrames horizontally
    result_df = pd.concat([df, vectorized_df_method1, vectorized_df_method2], axis=1)

    # Drop the non-vectorized columns
    result_df = result_df.drop(columns=columns_to_vectorize_1)
    result_df = result_df.drop(columns=columns_to_vectorize_2)
    #------------------------------------------------------------------------------------------------------
    colsdf = pd.read_csv(r'x_train.csv')
    colsdf = pd.DataFrame(columns=colsdf.columns.to_list())

    for column in colsdf.columns:
        if column in result_df.columns:
            colsdf[column] = result_df[column]
    colsdf = colsdf.fillna(0)
    #------------------------------------------------------------------------------------------------------
    orgdf = pd.read_csv(r'retrivaldata.csv')

    user_input = colsdf.iloc[0]  # Change the index (5) to any user index you want to test
    user_input = user_input.values.reshape(1, -1)  # Reshape to 2D array

    distances, indices = model.kneighbors(user_input, n_neighbors=4)
    
    top_4_indices = indices[0]

    top_4_profiles = orgdf.iloc[top_4_indices]
    
    top_4_profiles = top_4_profiles.dropna(axis=1, how='all')
    top_4_profiles = top_4_profiles.loc[:, (top_4_profiles != 0.0).any()]
    top_4_profiles = top_4_profiles.reset_index(drop=True)
    
    cosine_similarity_scores = [1 - distance for distance in distances]
    
    

    return top_4_profiles,distances

def main(arguments_json):

  
   
    json_input = arguments_json
    print(json_input)
  
    try:
        data_dict = json.loads(json_input)
    except json.JSONDecodeError:
        print("Invalid JSON input.")
    
    user_input = pd.DataFrame([data_dict])

    top_4_profiles = pd.DataFrame()
    top_4_profiles,distances = top_4_prediction(user_input)
    top_4_profiles = top_4_profiles.to_dict(orient='records')
 

    print(json.dumps(top_4_profiles))  # Print the output data as a JSON string





if __name__ == '__main__':
     # Get the command-line arguments passed to the script
    arguments = sys.argv[1:]

    if arguments:
        arguments_json = arguments[0]  # The JSON string is the first argument
        arguments_dict = json.loads(arguments_json)  # Deserialize the JSON string to a dictionary
        print(arguments_dict)
       
    else:
        print("No arguments received.")


    main(arguments_json)
