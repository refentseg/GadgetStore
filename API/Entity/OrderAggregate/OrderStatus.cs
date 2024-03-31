namespace API.Entity.OrderAggregate
{
    public enum OrderStatus
    { 
        //Add more for live website like delivering & add Delivered
        Pending,
        PaymentReceived,
        PaymentFailed
    }
}