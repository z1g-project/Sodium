(function () {
    const proxyOption = localStorage.getItem("proxyOption");
    console.log(proxyOption)
    if (proxyOption === "Scramjet") {
      replaceFormElement();
    }
  })();
  
  function replaceScript(scriptId, newSrc) {
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      const newScript = document.createElement("script");
      newScript.src = newSrc;
      newScript.defer = true;
      existingScript.parentNode.replaceChild(newScript, existingScript);
    }
  }
  
  function replaceFormElement() {
    const uvForm = document.getElementById("uv-form");
    if (uvForm) {
      const uForm = document.createElement("form");
      uForm.action = "/service/route";
      uForm.method = "POST";
      uForm.id = "uform";
      uForm.style.position = "relative"
      uForm.style.zIndex = "99"
      uForm.className = "flex-center";
      const input = document.createElement("input");
      input.title = "query";
      input.name = "url";
      input.autocomplete = "on";
      input.placeholder = "Search"
      input.className = "uv-address";
      uForm.appendChild(input);
      uvForm.parentNode.replaceChild(uForm, uvForm);
      console.log('switched to Scramjet')
    }
  }
