/**
 * Developed by Navid Ghahremani (ghahramani.navid@gmail.com)
 */

(function (angular) {
    'use strict';

    angular
        .module('app.blocks')
        .service('StringUtil', StringUtilService);

    StringUtilService.$inject = [];
    /* @ngInject */
    function StringUtilService() {
        this.convertTurkishCharacters = convertTurkishCharacters;
        this.limitTo = limitTo;
        this.normalizeSlugUrl = normalizeSlugUrl;

        ////////////////

        function convertTurkishCharacters(value) {
            var converted = value.replace('ü', 'u');
            converted = converted.replace('ı', 'i');
            converted = converted.replace('ö', 'o');
            converted = converted.replace('ü', 'u');
            converted = converted.replace('ş', 's');
            converted = converted.replace('ğ', 'g');
            converted = converted.replace('ç', 'c');
            converted = converted.replace('İ', 'I');
            converted = converted.replace('Ö', 'O');
            converted = converted.replace('Ü', 'U');
            converted = converted.replace('Ş', 'S');
            converted = converted.replace('Ğ', 'G');
            converted = converted.replace('Ç', 'C');
            return converted;
        }

        function limitTo(string, size) {
            if (!string) {
                return string;
            }
            if (string.length <= size) {
                return string;
            }
            var dots = "...";
            string = string.substr(0, size);
            var atWordEnd = string[size - dots.length] === ' ';
            if (atWordEnd) {
                return string.substr(0, size - dots.length) + dots;
            }
            return string.substr(0, string.lastIndexOf(" ") + 1) + dots;
        }

        function normalizeSlugUrl(value) {
            if (!angular.isString(value)) {
                return value;
            }
            var charMap = {
                'À': 'A',
                'Á': 'A',
                'Â': 'A',
                'Ã': 'A',
                'Ä': 'A',
                'Å': 'A',
                'Æ': 'AE',
                'È': 'E',
                'É': 'E',
                'Ê': 'E',
                'Ë': 'E',
                'Ì': 'I',
                'Í': 'I',
                'Î': 'I',
                'Ï': 'I',
                'Ð': 'D',
                'Ñ': 'N',
                'Ò': 'O',
                'Ô': 'O',
                'Õ': 'O',
                'Ő': 'O',
                'Ø': 'O',
                'Ù': 'U',
                'Ú': 'U',
                'Û': 'U',
                'Ű': 'U',
                'Ý': 'Y',
                'Þ': 'TH',
                'ß': 'ss',
                'à': 'a',
                'á': 'a',
                'â': 'a',
                'ã': 'a',
                'ä': 'a',
                'å': 'a',
                'æ': 'ae',
                'è': 'e',
                'é': 'e',
                'ê': 'e',
                'ë': 'e',
                'ì': 'i',
                'í': 'i',
                'î': 'i',
                'ï': 'i',
                'ð': 'd',
                'ñ': 'n',
                'ò': 'o',
                'ô': 'o',
                'õ': 'o',
                'ő': 'o',
                'ø': 'o',
                'ù': 'u',
                'ú': 'u',
                'û': 'u',
                'ű': 'u',
                'ý': 'y',
                'þ': 'th',
                'ÿ': 'y',

                '©': '(c)',

                'Α': 'A',
                'Β': 'B',
                'Γ': 'G',
                'Δ': 'D',
                'Ε': 'E',
                'Ζ': 'Z',
                'Η': 'H',
                'Θ': '8',
                'Ι': 'I',
                'Κ': 'K',
                'Λ': 'L',
                'Μ': 'M',
                'Ν': 'N',
                'Ξ': '3',
                'Ο': 'O',
                'Π': 'P',
                'Ρ': 'R',
                'Σ': 'S',
                'Τ': 'T',
                'Υ': 'Y',
                'Φ': 'F',
                'Χ': 'X',
                'Ψ': 'PS',
                'Ω': 'W',
                'Ά': 'A',
                'Έ': 'E',
                'Ί': 'I',
                'Ό': 'O',
                'Ύ': 'Y',
                'Ή': 'H',
                'Ώ': 'W',
                'Ϊ': 'I',
                'Ϋ': 'Y',
                'α': 'a',
                'β': 'b',
                'γ': 'g',
                'δ': 'd',
                'ε': 'e',
                'ζ': 'z',
                'η': 'h',
                'θ': '8',
                'ι': 'i',
                'κ': 'k',
                'λ': 'l',
                'μ': 'm',
                'ν': 'n',
                'ξ': '3',
                'ο': 'o',
                'π': 'p',
                'ρ': 'r',
                'σ': 's',
                'τ': 't',
                'υ': 'y',
                'φ': 'f',
                'χ': 'x',
                'ψ': 'ps',
                'ω': 'w',
                'ά': 'a',
                'έ': 'e',
                'ί': 'i',
                'ό': 'o',
                'ύ': 'y',
                'ή': 'h',
                'ώ': 'w',
                'ς': 's',
                'ϊ': 'i',
                'ΰ': 'y',
                'ϋ': 'y',
                'ΐ': 'i',

                'Ş': 'S',
                'İ': 'I',
                'Ç': 'C',
                'Ü': 'U',
                'Ö': 'O',
                'Ğ': 'G',
                'ş': 's',
                'ı': 'i',
                'ç': 'c',
                'ü': 'u',
                'ö': 'o',
                'ğ': 'g',

                'А': 'A',
                'Б': 'B',
                'В': 'V',
                'Г': 'G',
                'Д': 'D',
                'Е': 'E',
                'Ё': 'Yo',
                'Ж': 'Zh',
                'З': 'Z',
                'И': 'I',
                'Й': 'J',
                'К': 'K',
                'Л': 'L',
                'М': 'M',
                'Н': 'N',
                'О': 'O',
                'П': 'P',
                'Р': 'R',
                'С': 'S',
                'Т': 'T',
                'У': 'U',
                'Ф': 'F',
                'Х': 'H',
                'Ц': 'C',
                'Ч': 'Ch',
                'Ш': 'Sh',
                'Щ': 'Sh',
                'Ъ': '',
                'Ы': 'Y',
                'Ь': '',
                'Э': 'E',
                'Ю': 'Yu',
                'Я': 'Ya',
                'а': 'a',
                'б': 'b',
                'в': 'v',
                'г': 'g',
                'д': 'd',
                'е': 'e',
                'ё': 'yo',
                'ж': 'zh',
                'з': 'z',
                'и': 'i',
                'й': 'j',
                'к': 'k',
                'л': 'l',
                'м': 'm',
                'н': 'n',
                'о': 'o',
                'п': 'p',
                'р': 'r',
                'с': 's',
                'т': 't',
                'у': 'u',
                'ф': 'f',
                'х': 'h',
                'ц': 'c',
                'ч': 'ch',
                'ш': 'sh',
                'щ': 'sh',
                'ъ': '',
                'ы': 'y',
                'ь': '',
                'э': 'e',
                'ю': 'yu',
                'я': 'ya',

                'Є': 'Ye',
                'І': 'I',
                'Ї': 'Yi',
                'Ґ': 'G',
                'є': 'ye',
                'і': 'i',
                'ї': 'yi',
                'ґ': 'g',

                'Ď': 'D',
                'Ě': 'E',
                'Ň': 'N',
                'Ř': 'R',
                'Ť': 'T',
                'Ů': 'U',
                'ď': 'd',
                'ě': 'e',
                'ň': 'n',
                'ř': 'r',
                'ť': 't',
                'ů': 'u',

                'Ą': 'A',
                'Ć': 'C',
                'Ę': 'e',
                'Ł': 'L',
                'Ń': 'N',
                'Ó': 'o',
                'Ś': 'S',
                'Ź': 'Z',
                'Ż': 'Z',
                'ą': 'a',
                'ć': 'c',
                'ę': 'e',
                'ł': 'l',
                'ń': 'n',
                'ó': 'o',
                'ś': 's',
                'ź': 'z',
                'ż': 'z',

                'Ā': 'A',
                'Č': 'C',
                'Ē': 'E',
                'Ģ': 'G',
                'Ī': 'i',
                'Ķ': 'k',
                'Ļ': 'L',
                'Ņ': 'N',
                'Š': 'S',
                'Ū': 'u',
                'Ž': 'Z',
                'ā': 'a',
                'č': 'c',
                'ē': 'e',
                'ģ': 'g',
                'ī': 'i',
                'ķ': 'k',
                'ļ': 'l',
                'ņ': 'n',
                'š': 's',
                'ū': 'u',
                'ž': 'z'
            };

            angular.forEach(
                charMap, function (item, key) {
                    value = value.replace(new RegExp(key, 'g'), item);
                }
            );

            value = value.replace(/[^a-z0-9]+/ig, '-');
            value = value.replace(/[-]{2,}/g, '-');
            value = value.replace(/(^-|-$)/g, '');

            return value.toLowerCase();
        }
    }

})(angular);
