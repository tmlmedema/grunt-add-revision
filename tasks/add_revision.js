/*
 * grunt-add-revision
 * https://github.com/tmlmedema/grunt-add-revision
 *
 * Copyright (c) 2016 Kenneth Medema
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

 	var getRevisionString = function(){
 		var date = new Date();
 		var milliseconds = date.getTime();
 		return('?r='+milliseconds.toString());
 	};

 	var updateHTML = function(filePath){
 		var fileContents = grunt.file.read(filePath);
 		options.revise.forEach(function(revision){
 			var path = revision,
 			totalChars = path.length,
 			position = fileContents.indexOf(path) + totalChars;
 			fileContents = [fileContents.slice(0, position), options.revisionString, fileContents.slice(position)].join('');
 		});
 		grunt.file.write(filePath, fileContents);
 		grunt.log.writeln('File "' + filePath + '" has been updated.');
 	};

 	var options = this.options({
 		punctuation: '.',
 		separator: ', ',
 		revise: null,
 		revisionString: getRevisionString(),
 		currentFilePath: null
 	});

 	this.files.forEach(function(fileList){
 		fileList.src.forEach(function(filePath){
 			if (!grunt.file.exists(filePath)){
 				grunt.log.error('Source file "' + filePath + '" not found.');
 				return false;
 			}else{
 				updateHTML(filePath);
 				return true;
 			}
 		});
 	});

 };
