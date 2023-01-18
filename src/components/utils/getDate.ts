export const getDate = () => {
       const dateTime = new Date().toString().split(" ");
       return dateTime[1] + " " + dateTime[2] + " " + dateTime[3];
   }
