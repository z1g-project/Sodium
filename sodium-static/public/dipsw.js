Document.addEventListener('DOMContentLoaded', function() { 
	Document.getElementById('dipform').addEventListener('submit', async (e) => {
		e.preventDefault();
	  
		try {
		  const val = Document.getElementById('dipinput').value;
		  if (!val.startsWith('http')) val = 'https://' + val;
	  
		  const response = await fetch(window.__DIP.config.prefix + window.__DIP.encodeURL(val));
		  
		  if (response.ok) {
			location.assign(window.__DIP.config.prefix + window.__DIP.encodeURL(val));
		  } else {
			console.error('Failed to fetch:', response.status, response.statusText);
		  }
		} catch (error) {
		  console.error('Fetch error:', error);
		}
	  });
});
