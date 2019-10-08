class order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.date = date;
        this.items = items;
        this.totalAmount = totalAmount;
    }    
}

export default order;