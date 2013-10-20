/**
 * Created by mecal on 13-10-15.
 */
(function(){
	var count = 0;
	$("#alert").on("click", function(e){
		e.preventDefault();
		count++;
        if(count == 2){
            throw "err";
        }
		
		alert("This is a new app, click count:" + count + "\r\nWhen click twice, I'll get an error.");
	});
})();