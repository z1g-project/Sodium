(function () {
    const proxyOption = localStorage.getItem("proxyOption");
  
    if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
      replaceScript("proxloader", "dyn.sw.js");
      replaceScript("proxcfg", "/dyn/dyn.config.js");
      replaceScript("proxsw", "dynsw.js");
      replaceScript("proxworker", "/dyn/dyn.worker.js");
      replaceFormElement();
    } else if (proxyOption && proxyOption.toLowerCase() === "ultraviolet-bare") {
      replaceScript("proxloader", "/ultra/sw.js");
      replaceScript("proxcfg", "/ultra/ultra.config.js");
      replaceScript("proxsw", "oldsw.js");
      replaceScript("proxworker", "/ultra/ultra.handler.js");
      replaceFormElement();
    } else {
      replaceScript("proxloader", "/violet/sw.js");
      replaceScript("proxcfg", "/violet/violet.config.js");
      replaceScript("proxsw", "sw.js");
      replaceScript("proxworker", "/violet/violet.handler.js");
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
