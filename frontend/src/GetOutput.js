const getOutput = async (code, lang, input) => {
    const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ code: code, lang: lang, input: input })
    });
    const output = await res.json();
    if (output.statusCode >= 400 && output.statusCode < 500) {
        output.Status = output.error;
    }
    else {
        output.Status = "Successful";
    }
    return output;
};
export default getOutput;