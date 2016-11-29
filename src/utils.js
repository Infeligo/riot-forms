function toFormData(data) {
  var formData = new FormData();
  flatten(data, "", formData.append);
  return formData;
}

function flatten(obj, path, callback) {
  if (Array.isArray(obj)) {
    obj.forEach(function (val, index) {
      flatten(val, path + "[" + index +"]", callback);
    });
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach(function (key) {
      flatten(obj[key], (path ? path + "." : "") + key, callback);
    });    
  } else if (typeof obj === "function") {
    callback(path, obj());
  } else {
    callback(path, obj);
  }
}

function eachControlOrGroup(tag, callback, context) {
  var key, children;
  if (tag.tags) {
    for (key in tag.tags) {
      if (tag.tags.hasOwnProperty(key)) {
        [].concat(tag.tags[key]).forEach(function (child) {
          if (child.isFormGroup || child.isFormControl) {
            callback.call(context, child, key);
          } else {
            eachControlOrGroup(child, callback, context);
          }
        });
      }
    }    
  }
}

function ensureArray(obj, key) {
  return Array.isArray(obj[key]) ? obj[key] : (obj[key] = []);
}

function isFunction(fn) {
  return typeof fn === "function";
}