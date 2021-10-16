import Axios from "axios";

Axios.defaults.withCredentials = true;

const getOutput = async (code, lang, input, question_id, btn_clicked) => {
  console.log(question_id);
  let url = "http://localhost:5000/";
  // url = url + (question_id === undefined) ? "run" : `submit/ + question_id`;
  if (
    (question_id === undefined && btn_clicked === "run") ||
    btn_clicked === "run"
  ) {
    url += "run";
  } else {
    url += `submit/${question_id}`;
  }
  console.log(url);
  try {
    const res = await Axios({
      url: url,
      method: "post",
      data: {
        code: code,
        lang: lang,
        input: input,
        question_id: question_id,
      },
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export default getOutput;
