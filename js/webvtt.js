/*
Language: WebVTT
Author: Markus Hermann <hermann.markus@gmail.com>
Description: language definition for WebVTT files
Category: markup
*/

hljs.registerLanguage("webvtt", (function(e) {
    return {
        case_insensitive: true,
        contains: [
            {
                className: 'attribute',
                begin: /((?:(\d{2,})(:))?(\d\d)(:)(\d\d)(\.)(\d{3}))/
            },
            {
                className: 'comment',
                begin: /^NOTE /,
                end: /\n\n/ 
            },
            {
                className: 'punctuation',
                begin: /-->/,
            },
            {
                className: 'title',
                begin: /^WEBVTT$/,
                end: /$/
            },
            {
                className: 'string',
                begin: /^.*$/,
            },
        ]
    };
}));