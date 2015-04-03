<?php
class Database {

    //private means u can only use it with in this file (database). 
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;

//local variables will disappear once the function is done running.
    //defines the constructor
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        //created a new msqli object thats being stored in connection
        $this->connection = new mysqli($host, $username, $password);
        //checks if theres an error 
        //if error , program has to die off . 
        if ($this->connection->connect_error) {
            die("<p> Error: " . $this->connection->connect_error . "</p>");
        }
        //call the database 

        $exists = $this->connection->select_db($database);

        //checking if data base excists or not 

        if (!$exists) {
            //sends comands to data base
            $query = $this->connection->query("CREATE DATABASE $database");
            //checking if query is created successfully . 
            if ($query) {
                //checking if data base is created
                echo "<p>successfully created a database: " . $database . "</p>";
            }
        }
        //else statement 
        // if database exists
        else {
            echo "<p>datebase already exists</p>";
        }
    }

//openning a connection
    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        //checks if theres an error connecting to the base
        //if error , program has to die off . 
        if ($this->connection->connect_error) {
            die("<p> Error: " . $this->connection->connect_error . "</p>");
        }
    }

    public function closeConnection() {
        //checking if we have a connection , if there is info in there , the statement is true
        //checks if the variable has been set or not
        //or if there is something within the variable
        if (isset($this->connection)) {
            $this->connection->close();
        }
    }

//everytime we call our query function we have to call a string can be located in the variable
    public function query($string) {
        //calling a function and openning it
        $this->openConnection();
        //this will exicute a query in our database
        //takes in a string of texts the queries the string to the database below

        $query = $this->connection->query($string);
        //when query stores true  , false is going to be outputted
        if (!$query) {
            $this->error = $this->connection->error;
        }

        $this->closeConnection();

        return $query;
    }

}

//we make a class to call it later on
//you can customize the behavior of that set of functions