import moment from 'moment';

class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.date = date;
        this.items = items;
        this.totalAmount = totalAmount;
    }
    get readableDate() {
        // return this.date.toLocaleDateString('en-EN', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit'
        // }); supports JS engine in IOS only
        return moment(this.date).format('MMMM Do YYYY, hh:mm a');
    }
}

export default Order;
