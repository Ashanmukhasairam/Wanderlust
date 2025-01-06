class ExpressError extends Error { //inbuilt Error class is used.
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
        
    }
}