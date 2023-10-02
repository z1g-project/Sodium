(function () {
    const proxyOption = localStorage.getItem("proxyOption");
  
    if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
      replaceScript("proxloader", "dynamic.sw.js");
      replaceScript("proxcfg", "/dynamic/dynamic.config.js");
      replaceScript("proxsw", "dynamicsw.js");
      replaceScript("proxworker", "/dynamic/dynamic.worker.js");
  
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
      uForm.className = "flex-center";
      
      const input = document.createElement("input");
      input.title = "query";
      input.name = "url";
      input.autocomplete = "on";
      input.placeholder = "Search"
      input.className = "uv-address";
      
      uForm.appendChild(input);
      uvForm.parentNode.replaceChild(uForm, uvForm);
    }
  }
