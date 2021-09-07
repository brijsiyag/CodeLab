const getOutput = async (code, lang, input) => {
    const res = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ code: code, lang: lang, input: input })
    });
    const output = await res.json();
    console.log(output);
    return output;
};

export default getOutput;
