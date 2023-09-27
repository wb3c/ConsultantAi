const values = {};

values.url = "http://localhost:5000/";
values.url = "https://consultantaibackend.vercel.app/";
values.fontEndUrl = "http://localhost:5173";
// values.url = "https://om.consultantai.co/";

values.getCurrentTime = () => {
  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Morning";
  } else {
    return "Evening";
  }
};
export default values;
// https://docs.aws.amazon.com/polly/latest/dg/ntts-voices-main.html
