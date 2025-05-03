function ticketGenerator(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketNo = '';

    for (let i = 0; i < 5; i++) {
        ticketNo += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      return ticketNo;


}
module.exports = ticketGenerator;