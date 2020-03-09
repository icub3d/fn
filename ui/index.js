class Function {
  constructor(definition) {
    this.definition = definition;
  }

  async template() {
    return fetch(`/fns/${this.definition.name}.html`);
  }

  load() {
    this.template()
      .then(response => response.text())
      .then(template => {
        $("#main").html(
          Mustache.render($("#function-detail-template").html(), {
            definition: this.definition,
            template: template
          })
        );
      });
  }
}

$(document).ready(function() {
  fetch("/functions.json")
    .then(response => response.json())
    .then(data => {
      // Setup routes.
      var router = new Navigo(null, true, "#!");

      // The home page.
      router.on(function() {
        // show home page
        $("#main").html(
          Mustache.render($("#function-summary-template").html(), {
            functions: data
          })
        );
      });

      // Load each of the functions.
      data.forEach(fn => {
        var f = new Function(fn);
        router.on(`/fn/${fn.name}`, () => {
          f.load();
        });
      });

      router.resolve();
    });
});
