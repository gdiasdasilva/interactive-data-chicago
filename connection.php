<?
	function connectToDB()
	{
		$db = mysqli_connect('localhost', 'root', 'root', 'vid');
	    
	    if (mysqli_connect_errno())
	    {
	        printf("Connect failed: %s\n", mysqli_connect_error());
	        exit();
	    }
	    
	    return $db;
	}
?>