import Axios from "axios";
Axios.defaults.withCredentials = true;
const getOutput = async (code, lang, input, question_id) => {
  try {
    const res = await Axios({
      url: "http://localhost:5000/submit",
      method: "post",
      data: {
        code: code,
        lang: lang,
        input: input,
        question_id: question_id,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export default getOutput;
