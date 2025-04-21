class Balance_Tracker {
    constructor(initial_amount) {
        //Set intial balance
        this.balance = initial_amount;

        //Get HTML element that displays balance
        this.balanceElement = document.getElementById('balance-amount');
        
        this.render();
    }

    render() { //update on screen balance tracker
        if (this.balanceElement) {
            this.balanceElement.textContent = "$" + this.balance;
        }
    }

    add(amount) { //add to balance
        this.balance += amount;
        this.render();
    }

    deduct(amount) { //remove from balance
        this.balance -= amount;
        this.render();
    }

    reset() { //reset balance
        this.balance = 0;
        this.render();
    }

}
export default Balance_Tracker;