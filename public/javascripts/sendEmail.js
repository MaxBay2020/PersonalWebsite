$('#sendBtn').click(()=>{
	$.post('/send', {
		firstName: $('#firstName').val(),
		lastName: $('#lastName').val(),
		phone: $('#phone').val(),
		email: $('#email').val(),
		comment: $('#comment').val()
	}, (data) => {
		if(data==='1'){
			swal("Good job!", "I have received your email. I will reply soon! Thank you!", "success");
			swal({
				  title: "Good job!",
				  text: "I have received your email. I will reply soon! Thank you!",
				  icon: "success",
				  button: "OK"
				})
			.then(() => {
				  window.location='/'
			});
		}
	})
})