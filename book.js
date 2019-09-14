var bao = bao || {};
bao.book = (() => {
  var sections = {
    Home     : 'index',
    Contents : 'contents',
    About    : 'about', 
  };

  function getNavbar(section, level) {
    var bar = '<nav class="navbar navbar-expand-md navbar-light bg-light">' +
      '  <span class="navbar-brand">🕸</span>' + 
      '  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"' +
      ' aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
      '    <span class="navbar-toggler-icon"></span>' +
      '  </button>' + 
    
      '  <div class="collapse navbar-collapse" id="navbarSupportedContent">' + 
      '    <ul class="navbar-nav mr-auto">';

    Object.keys(sections).forEach(k => {
      var active = section === k ? ' active' : '',
          prefix = section !== k || level > 0 ? '../'.repeat(level) : '',
          link = `${prefix}${sections[k]}.html`;

      bar += `      <li class="nav-item"><a class="nav-link${active}" href="${link}">${k}</a></li>`;
    });

    bar += '    </ul></div></nav>';

    return bar;
 }

  function getNavItems(section, level) {
    var items = [];

    Object.keys(sections).forEach(k => {
      var active = section === k ? ' active' : '',
          prefix = section !== k || level > 0 ? '../'.repeat(level) : '',
          link = `${prefix}${sections[k]}.html`;

      items.push({ active: active, link: link, title: k });
    });

    return items;
  }

  function init() {
    regVueComponents();
    expandToc();
  }

  function expandToc() {
    $(document).on('click', '.toc-toggle', function() {
      var $btn = $(this);
      $btn.parent().next().toggle('show');
      $btn.text($btn.text() == '+' ? '-' : '+');
    });

    $(document).on('click', '.toc-toggle-all', function() {
      var $btn = $(this);

      if ($btn.text().includes('+')) {
        $btn.text('- Collapse All');
        $('.toc-toggle').text('-');
        $('.toc-sections').show();
      } else {
        $btn.text('+ Expand All');
        $('.toc-toggle').text('+');
        $('.toc-sections').hide();
      }
    });
  }

  function regVueComponents() {
    // Vue.component('navbar', {
    //   props: ['section', 'level'],
    //   template: '<nav class="navbar navbar-expand-md navbar-light bg-light">' +
    //             '  <span class="navbar-brand">🕸</span>' + 
    //             '  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"' +
    //             '  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
    //             '    <span class="navbar-toggler-icon"></span>' +
    //             '  </button>' + 
    //             '  <div class="collapse navbar-collapse" id="navbarSupportedContent">' + 
    //             '    <ul class="navbar-nav mr-auto">' +
    //             '      <slot></slot>' +
    //             '    </ul>' + 
    //             '  </div>' +
    //             '</nav>'
    // });

    // Vue.component('nav-item', {
    //   props: ['item'],
    //   template: '<li class="nav-item">' +
    //             '  <a class="nav-link{{ item.active }}" href="{{ item.link }}">{{ item.title }}</a>' +
    //             '</li>'
    // });

    Vue.component('toc-chapter', {
      props: ['chapter'],
      template: '<div class="toc-chapter">' +
                '  <div class="toc-chapter-title">' +
                '    <h3 class="chapter" lang="en">{{ chapter.title }}</h3>' +
                '    <span class="toc-toggle">+</span>' +
                '  </div>' +
                '  <div class="toc-sections">' +
                '    <template v-for="sec in chapter.sections">' +
                '      <slot :section="sec"></slot>' +
                '    </template>' +
                '  </div>' +
                '</div>',
    });

    Vue.component('toc-section', {
      props: ['section'],
      template: '<h4 class="section">{{ section.title }}</h4>'
    });
  }

  return {
    getNavbar : getNavbar,
    init        : init,
  };
})();
