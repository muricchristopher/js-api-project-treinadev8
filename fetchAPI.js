const fetchAPI = async (url, options) => {
    let response;
    let json;
    let error;
    let loading;
    let data;

    try{
      error = null;
      loading = true;
      response = await fetch(url, options);
      json = await response.json();
    }
    catch(err){
      json = null;
      error = 'Failure to fetch data'
    }
    finally{
      data = json;
      loading = false;
      return{response, json, data, loading, error}
    }

  }

export default fetchAPI
