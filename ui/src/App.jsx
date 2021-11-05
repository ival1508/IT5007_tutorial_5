/*const initialCustomers = [];*/

/* extends React.Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(e) {
        e.preventDefault();
        this.hideComponent("AddCustomer")
    }

    render() {
      return (
            <button onClick={this.handleClick}>
                Add Customer fake
            </button>
      );
    }
  }*/

class DisplayFreeSlots extends React.Component {
    constructor() {
        super();
    }

    render() {
    const slots_left = 25 - this.props.customers.length
      return (
        <div>
            <p name="limit_alert"></p>
            <p className="slots_left_header">Slots left: {slots_left}</p>
            
        </div>
      );
    }
  }
  
class CustomerRow extends React.Component {
  render() {
    const customer = this.props.customer;
    return (
      <tr>
        <td>{customer.queue_number}</td>
        <td>{customer.name}</td>
        <td>{customer.contact_number}</td>
        <td>{customer.timestamp}</td>
        {/* <td>{customer.timestamp.toTimeString()}</td> as we use string instead of a Date object, a call to convert the data to a string throws an error*/}
      </tr>
    );
  }
}
  
class CustomerTable extends React.Component {
  render() {
    const customerRows = this.props.customers.map(customer =>
      <CustomerRow key={customer.id} customer={customer} />
  );


    return (
      <table className="bordered-table">
        <thead>
          <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
            {customerRows}
        </tbody>
      </table>
    );
  }
}
  
class AddCustomer extends React.Component {

  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.addCustomer;
      const customer = {
        name: form.name.value, contact_number: form.phone.value,
      }
      this.props.createCustomer(customer);
      form.name.value = ""; form.phone.value = "";
    }     

  render() {
    return ( 
      <div>
          <h1>Add customer</h1>
          <form name="addCustomer" onSubmit={this.handleSubmit}>
              <input type="text" name="name" placeholder="Name (required)" required={true} style={{margin: 10}}/>
              <input type="tel" name="phone" placeholder="Phone number (8 digits)" pattern="[0-9]{8}" style={{margin: 10}}/>
              <button style={{margin: 10}}>Add</button>
          </form>
      </div>
    );
  }
}
  
class DeleteCustomer extends React.Component {

  constructor() {
      super();
      this.handleDelete = this.handleDelete.bind(this);
    }

  handleDelete(e) {
      e.preventDefault();
      const form = document.forms.deleteCustomer;
      const customer = {
        queue_number: form.id.value,
      }
      this.props.deleteCustomer(customer);
      form.id.value = "";
    }     

  render() {
    return ( 
      <div>
          <h1>Delete customer from the queue</h1>
          <form name="deleteCustomer" onSubmit={this.handleDelete} style={{margin: 10}}>
              <input type="number" name="id" placeholder="Customer ID to delete" style={{margin: 10}}/>
              <button>Delete</button>
          </form>
      </div>
    );
  }
}

class DisplayHomepage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Hotel California!</h1>
      </div>
    );
  }
}

class CapacityAlert extends React.Component {
  render() {
    return (
      <div>
        <h1>No more slots!</h1>
      </div>
    );
  }
}

class DisplayResSystem extends React.Component {

  constructor() {
      super();
      this.state = {
        customers: [],
        AddCustomerToggle: false,
        DeleteCustomerToggle: false,
        TooManyCustomers: false
      };
      this.hideComponent = this.hideComponent.bind(this);
      this.createCustomer = this.createCustomer.bind(this);
      this.deleteCustomer = this.deleteCustomer.bind(this);
    }
  
  componentDidMount() {
    this.loadData();
  }
  
  async loadData() { //adding keyword async since we've used await within its functions
    /*setTimeout(() => {
      this.setState({ customers: initialCustomers });
    }, 500); *///old version before the API integration
    //need to construct a graphQL query within the loadData() method
    const query = `query { 
      customerList {
        queue_number name contact_number timestamp
      }
    }`;
    //fetch request
    const response = await fetch ('http://localhost:3000/graphql', {
      method: 'POST', //method we'll use is POST -> why is that?
      headers: { 'Content-Type': 'application/json'}, //adding a header that the content type is JSON
      body: JSON.stringify({ query }) //sending this query string as they value for the query property within JSON as part of the body to the fetch request
    });
    
    const result = await response.json(); //converting JSON data from response to a Javascript object using response.json() method
    this.setState({ customers: result.data.customerList}) //supplying the list of issues to the state variable called issues
  }

  hideComponent(varname) {
      switch (varname) {
        case "AddCustomer":
          this.setState({ AddCustomerToggle: !this.state.AddCustomerToggle });
          break;
        case "DeleteCustomer":
          this.setState({ DeleteCustomerToggle: !this.state.DeleteCustomerToggle });
          break;
        default: return;
      }
  }

  async createCustomer(customer) {
      const query = `mutation {
        customerAdd(customer: {
          name: "${customer.name}",
          contact_number: ${customer.contact_number},
        }) {
          queue_number
        }
      }`;
      const response = await fetch ('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
      });

      const result = await response.json();
      
      if (result.data.customerAdd.queue_number >= 5) {
        this.setState({ TooManyCustomers: true});
        this.loadData();
      } else {
        this.loadData();
      }
  
        /*customer.id = this.state.customers.length + 1;
    if (customer.id > 25) {
        this.setState({ TooManyCustomers: true});
    } else if (customer.id == 25) {
        customer.timestamp = new Date();
        const newCustomersList = this.state.customers.slice();
        newCustomersList.push(customer);
        this.setState({ customers: newCustomersList, TooManyCustomers: true });
    } else {
        customer.timestamp = new Date();
        const newCustomersList = this.state.customers.slice();
        newCustomersList.push(customer);
        this.setState({ customers: newCustomersList });
    }*/
  }
  
  async deleteCustomer(customer) {
      const query =  `mutation {
        customerDelete(customer: {
          queue_number: ${customer.queue_number},
        }) {
          queue_number name contact_number timestamp
        }
      }`

      const response = await fetch ('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
      })

      this.loadData();
      /*const ID_to_delete = customer.id - 1;
      const newCustomersList = this.state.customers.slice();
      newCustomersList.splice(ID_to_delete,1);
      for (let i = 0, len = newCustomersList.length; i < len; i++) {newCustomersList[i].id = i+1};
      this.setState({ customers: newCustomersList, TooManyCustomers: false });*/
    }  

  render() {
      const { AddCustomerToggle, DeleteCustomerToggle, TooManyCustomers } = this.state;
      return (
      <React.Fragment>
        <DisplayHomepage />
        <div>
          <button className="button" onClick={() => this.hideComponent("AddCustomer")}>
              Add Customers
          </button>
          <button className="button" onClick={() => this.hideComponent("DeleteCustomer")}>
              Delete Customers
          </button>
        </div>
        <DisplayFreeSlots customers={this.state.customers}/>
        {AddCustomerToggle && <AddCustomer createCustomer={this.createCustomer}/>}
        {TooManyCustomers && <CapacityAlert />}
        {DeleteCustomerToggle && <DeleteCustomer deleteCustomer={this.deleteCustomer}/>}
        <CustomerTable customers={this.state.customers}/>
      </React.Fragment>
    );
  }
}

const element = <DisplayResSystem />;

ReactDOM.render(element, document.getElementById('contents'));