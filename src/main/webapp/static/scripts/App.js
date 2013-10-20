/**
 * Created by mecal on 13-10-15.
 */
(function(){
	var count = 0;
	$("#alert").on("click", function(e){
		e.preventDefault();
		count++;
		alert("Hello world, I'm a simple click ancher, click count:" + count + "\r\nWhen click 3 times, I'll get an error.");

        if(count == 3){
            throw "er";
        }
	});
})();