# Frontend Framework
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Installation

You need Grunt installed globally.
```sh
$ npm i -g grunt
```
Once Grunt has been installed install the plugins
```sh
$ npm install
```
Finally create basic folders and files
```sh
$ grunt
```

## Documentation
The framework helps you to generate your style.css with nice arquitecture using atomic web design, sass and grunt. It works for every project it doesn't matter if you use Wordpress, Drupal, Symphony, Angular or whatever you want.

These framework is based on [Brad Frost's Atomic Design post](http://bradfrost.com/blog/post/atomic-web-design/)

### Tasks
#### Generate basic folders and files
With this default task you generate the minimal folder and files to start
```sh
$ grunt
```
#### Start development mode
Start your development creating your HTML and CSS, with Jade and Sass it's very easy and you don't need to refresh your browser, just code and see.
```sh
$ grunt start
```
#### Validate CSS and HTML
Check your CSS and HTML with this task
```sh
$ grunt validation
```

#### Generate ngrok tunnel
Create a ngrok tunnel to display your project
```sh
$ grunt ngrok
```

## Frontend Tecnologies

### Grunt
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

### Jade
Here is the [Jade](https://github.com/gruntjs/grunt-contrib-jade) documentation. With Jade it's very easy to start your html. As you can see I use an Atomic structure like Sass. Import your files and [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

### Sass
[Sass](http://sass-lang.com) is a preprocessor that adds nested rules, variables, mixins and functions, selector inheritance, and more to CSS. Sass files compile into well-formatted, standard CSS to use in your site or application.

This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/) and [Sass](http://sass-lang.com/download.html) installed. If you're on OS X or Linux you probably already have Ruby installed; test with `ruby -v` in your terminal. When you've confirmed you have Ruby installed, run `gem install sass` to install Sass.

[Plugin docmentation](https://github.com/gruntjs/grunt-contrib-sass)

Note: Files that begin with "_" are ignored even if they match the globbing pattern. This is done to match the expected [Sass partial behaviour](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).

### CSSlint
Here is the [CSSlint](https://github.com/gruntjs/grunt-contrib-csslint) documentation. If you want to change any option you have a _.csslintrc_ file on root directory. Feel free to change.

### W3C Validation
Here is the [W3C HTML Validation](https://github.com/vikash-bhardwaj/grunt-w3c-html-validation) documentation.

## Based on
  - [DrupalCon 2015 Component Driven Design and Development](https://events.drupal.org/barcelona2015/sessions/component-driven-design-and-development)
  - [Wakkos framework](https://github.com/Wakkos/Wakkos-CSS-Framework/tree/Patrones/scss)
  - Magic

## Version
1.0.0

## Support / Contributing

Want to contribute? Great! Just open an issue or if you prefer send me a mail or [tweet me](https://twitter.com/ElChicoNube).

## Todos
  - Performance
  - Testing (ngrok)
  - Precommits

## Author
More info about me [here](http://oscarbustos.me/);

## License
**Free Software, Hell Yeah!**
