
## API Reference

### auth service
#### signup

```http
  POST https://ticketing.dev/api/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

retrun cookie + user details and registers the user to the system


#### signin:

```http
  POST https://ticketing.dev/api/users/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

retrun cookie + user details If the user is registered to the system


#### currentuser:

```http
  GET https://ticketing.dev/api/users/currentuser
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
If a suitable cookie is provided, the logged in user information will be returned



#### singout:

```http
  GET https://ticketing.dev/api/users/singout
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
remove cookie


### order service

#### order create:

```http
  POST https://ticketing.dev/api/orders
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ticketId` | `string` | **Required** |
    
create an order.


#### order create:

```http
  GET https://ticketing.dev/api/orders
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
get all order.

### payments service
#### payments create:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `orderId` | `string` | **Required** |
| `token` | `string` | **Required** |
create an payments.
token come from Stripe or use the val "tok_visa" when dev.

### tickets service
#### tickets create:
```http
  POST https://ticketing.dev/api/tickets
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `price` | `number` | **Required** |
    
create an ticket.


#### get ticket:
```http
  GET https://ticketing.dev/api/tickets/{ticketId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
get an ticket with id of {ticketId}.

#### get tickets:
```http
  GET https://ticketing.dev/api/tickets
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `empty` | `emptyObject` | **body need to be empty** |
    
get all tickets.

#### update ticket:
```http
  PUT https://ticketing.dev/api/tickets/{ticketId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** |
| `price` | `number` | **Required** |
    
update a ticket.
