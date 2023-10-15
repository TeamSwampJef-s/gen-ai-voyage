from elasticsearch import Elasticsearch

client = Elasticsearch(
  'https://verbot.es.us-central1.gcp.cloud.es.io',
    api_key='V1NWak1Zc0JQbkJxT1d6RDZscHM6dFRXY21BVEJTdGFKWm5YRlFrRzZaUQ==',
)

textFromChatGPT = '''
Apple products
'''

data = es_response = client.search(
            index="products",
            body={
                "query": {
                    "query_string": {
                        "query": textFromChatGPT,
                        "analyzer": "custom_cross_fields_analyzer"
                    }
                },
                "size": 3,
               "_source": ["Name", "Brand", "Price", "ImageURL", "URL", "Category"]
            }
        )

# Extract data into a list of attributes
# attributes = []

# for category_bucket in data['aggregations']['category_agg']['buckets']:
#     category = category_bucket['key']
#     items = []

#     for item in category_bucket['hits']['hits']['hits']:
#         item_data = item['_source']
#         items.append({
#             'Name': item_data['Name'],
#             'Brand': item_data['Brand'],
#             'URL': item_data['URL'],
#             'Price': item_data['Price'],
#             'ImageURL': item_data['ImageURL']
#         })

#     attributes.append({
#         'Category': category,
#         'Items': items
#     })

print([hit.get('_source') for hit in data.get('hits', {}).get('hits', [])])