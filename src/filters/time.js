export default function (time) {
    time= time*1000;
    
    let date= new Date(time);
    date=date.toISOString().split("T")[0];
    return date;
}