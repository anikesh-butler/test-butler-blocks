import './App.css';
import { useEffect } from 'react';
import { loadButlerBlocks } from 'butler-blocks';

const myApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExNzI0MjgwNTUyNzczMTE1MTkzMyIsImVtYWlsIjoiYW5pa2VzaEBidXRsZXJsYWJzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY0NjgzODUxMjc2OX0.vOiBwdg41b3653AgGQc0-HKImZAwNdLYuaKh428ZZaU';
const myDocument = {
  modelId: 'fd742066-f143-451d-ba73-b75c3340b670',
  documentId: '461dcea0-e1bb-47b5-a738-49cfa2319ec4',
};

function App() {
  
  useEffect(() => {
    const butlerBlocks = loadButlerBlocks(myApiKey);

    // Step 3: Fetch data about your document from Butler
    const fetchDocumentData = async (modelId, documentId) => {
      const extractionResultsResponse =
        await butlerBlocks.api.getExtractionResults(modelId, documentId);
      const { data } = extractionResultsResponse;
      return data;
    }   

    // Step 4: Handle saving labels

    // Define a submit labels function, which will pass the output of the
    // document labeler to the API to help train your model!
    const submitLabels = async (trainingDocumentLabels) => {
      await butlerBlocks.api.submitDocumentLabels(
        myDocument.modelId,
        myDocument.documentId,
        trainingDocumentLabels.results
      );
    }

    // This function defines what action to take when the user clicks
    // the save button in the document labeler
    const onSaveCallback = (docInfo) => {
        submitLabels(docInfo.trainingDocumentLabels);
    };

    const initializeDocLabeler = async ({ modelId, documentId }) => {
      // using the function we defined earlier to fetch document data
      const data = await fetchDocumentData(modelId, documentId);
    
      // Note: the first parameter for this function should be the Id
      // that you specified in your html div element
      butlerBlocks.createDocLabeler('ButlerDocumentLabeler', data, onSaveCallback);
    };
    
    // Call this function when you want to display the labeler!
    initializeDocLabeler(myDocument);
  }, []);

  return (
    <div className="App" id='ButlerDocumentLabeler'>
      
    </div>
  );
}

export default App;
