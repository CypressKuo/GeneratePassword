angular.module('genpwApp', [])

.controller('genpw', ['$scope', function($scope) {
    $scope.group_number = 1;
    $scope.password_length = 1;
    $scope.have_number = true;
    $scope.have_upper = true;
    $scope.have_lower = true;
    $scope.have_symbol = true;
    $scope.no_similarity = true;

    $scope.generate = function() {
        var password_group = '';
        var results = [];

        if ($scope.have_number) {
            password_group += '0123456789';
        }
        if ($scope.have_upper) {
            password_group += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ($scope.have_lower) {
            password_group += 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($scope.have_symbol) {
            password_group += '!@#$%^&*';
        }
        if ($scope.no_similarity) {
            password_group = str_replace('!', '', password_group);
            password_group = str_replace('1', '', password_group);
            password_group = str_replace('l', '', password_group);
            password_group = str_replace('I', '', password_group);
            password_group = str_replace('o', '', password_group);
            password_group = str_replace('O', '', password_group);
            password_group = str_replace('0', '', password_group);
        }

        var group_length = password_group.length;

        for (var i = 0; i < $scope.group_number; i++) {
            var result = '';
            for (var j = 0; j < $scope.password_length; j++) {
                var randstr = rand(0, group_length - 1);
                result += substr(password_group, randstr, 1);
            }
            results.push(result);
        }

        $scope.results = results;
    }
    $scope.generate();
}]);


function str_replace(search, replace, subject, count) {
  var i = 0,
    j = 0,
    temp = '',
    repl = '',
    sl = 0,
    fl = 0,
    f = [].concat(search),
    r = [].concat(replace),
    s = subject,
    ra = Object.prototype.toString.call(r) === '[object Array]',
    sa = Object.prototype.toString.call(s) === '[object Array]';
  s = [].concat(s);
  if (count) {
    this.window[count] = 0;
  }

  for (i = 0, sl = s.length; i < sl; i++) {
    if (s[i] === '') {
      continue;
    }
    for (j = 0, fl = f.length; j < fl; j++) {
      temp = s[i] + '';
      repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
      s[i] = (temp)
        .split(f[j])
        .join(repl);
      if (count && s[i] !== temp) {
        this.window[count] += (temp.length - s[i].length) / f[j].length;
      }
    }
  }
  return sa ? s : s[0];
}

function rand(min, max) {
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function substr(str, start, len) {
  var i = 0,
    allBMP = true,
    es = 0,
    el = 0,
    se = 0,
    ret = '';
  str += '';
  var end = str.length;

  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
    case 'on':
      for (i = 0; i < str.length; i++) {
        if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
          allBMP = false;
          break;
        }
      }

      if (!allBMP) {
        if (start < 0) {
          for (i = end - 1, es = (start += end); i >= es; i--) {
            if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
              start--;
              es--;
            }
          }
        } else {
          var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
          while ((surrogatePairs.exec(str)) != null) {
            var li = surrogatePairs.lastIndex;
            if (li - 2 < start) {
              start++;
            } else {
              break;
            }
          }
        }

        if (start >= end || start < 0) {
          return false;
        }
        if (len < 0) {
          for (i = end - 1, el = (end += len); i >= el; i--) {
            if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
              end--;
              el--;
            }
          }
          if (start > end) {
            return false;
          }
          return str.slice(start, end);
        } else {
          se = start + len;
          for (i = start; i < se; i++) {
            ret += str.charAt(i);
            if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
              se++;
            }
          }
          return ret;
        }
        break;
      }
    case 'off':
    default:
      if (start < 0) {
        start += end;
      }
      end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
      return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
  }
  return undefined; // Please Netbeans
}