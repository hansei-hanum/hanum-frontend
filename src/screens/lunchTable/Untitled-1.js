/* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-var-requires */
// const LUNCH_MAP = [
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: true,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
//   {
//     date: '5/27(수)',
//     lunch: '현미밥, 불고기, 앙기모링, 스슈, 맛있당, 오믈라이스',
//     isPrimary: false,
//   },
// ];

// // slice like [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9]]
const LUNCH_MAP_SLICED = LUNCH_MAP.reduce((acc, cur, idx) => {
  if (idx % 2 === 0) {
    acc.push([LUNCH_MAP[idx], LUNCH_MAP[idx + 1]]);
  }
  return acc;
}, []);

// console.log(LUNCH_MAP_SLICED);

// ('use strict');
// var __importDefault =
//   (this && this.__importDefault) ||
//   function (mod) {
//     return mod && mod.__esModule ? mod : { default: mod };
//   };
// Object.defineProperty(exports, '__esModule', { value: true });
// const axios_1 = __importDefault(require('axios'));
// const cheerio_1 = __importDefault(require('cheerio'));
// const node_schedule_1 = __importDefault(require('node-schedule'));
// const discord_js_1 = __importDefault(require('discord.js'));
// const chennel_json_1 = __importDefault(require('../config/chennel.json'));
// const klunch = require('k-lunch');

// const app_1 = require('../app');
// const role_1 = require('../utility/role');
// const env_1 = require('../env');
// const thecatapi_1 = require('../utility/thecatapi');
// const default_menu_image =
//   'https://cdn.discordapp.com/attachments/810047161664143383/917375246380724244/main_school_menu_thumbnail.jpg';
// exports.init = async () => {
//   app_1.Application.Commands['rt'] =
//     app_1.Application.Commands['ㄳ'] =
//     app_1.Application.Commands['ㄱㅅ'] =
//     app_1.Application.Commands['급식'] =
//       async (req, args) => {
//         if (req.author.bot) return;
//         sendCafeteriaInfo(
//           args[0] === 'g' && (0, role_1.isAdmin)(req.member) ? getCafeteriaChennel() : req.channel,
//           req.author,
//         );
//       };
//   node_schedule_1.default.scheduleJob('0 0 10 * * MON-FRI', async () => {
//     sendCafeteriaInfo(getCafeteriaChennel(), undefined);
//   });
// };
// function getCafeteriaChennel() {
//   return app_1.Application.Current.Bot.guilds.cache
//     .get(env_1.__guild_id)
//     ?.channels.cache.get(chennel_json_1.default.cafeteria_ch);
// }
// async function getCafetriaLib() {
//   let time = new Date();
//   const form = {
//     year: time.getFullYear(),
//     month: time.getMonth() + 1,
//     day: time.getDate(),
//     time: 2,
//     name: '한세사이버보안고등학교',
//     phase: 4,
//   };
//   const options = {
//     autoCode: true,
//     autoDomain: true,
//   };
//   return new Promise((resolve, reject) => {
//     klunch.getLunch(
//       form,
//       (err, output) => {
//         if (err) reject(err);
//         let menus = [];
//         for (let menu_i in output) {
//           let menu = output[menu_i];
//           if (!menu) continue;
//           menus.push({
//             name: menu.menu,
//             allergys: getAllergyInfo(menu.allergyInfo),
//           });
//         }
//         resolve(menus);
//       },
//       options,
//     );
//   });
// }
// async function getCafeteria() {
//   let cafeteria = { isCafeteria: false, img: '', text: '' };
//   let body = cheerio_1.default.load(
//     (await axios_1.default.get('https://hansei.sen.hs.kr/index.do')).data,
//   );
//   let cafeteria_img = body('p[class="school_menu_thumbnail"]').children('img').attr('src');
//   let no_cafeteria = body('div[class="index_mlsv_box"]').children('center').text();
//   if (no_cafeteria.includes('존재하지 않')) cafeteria.isCafeteria = false; // 급식 없을때
//   else {
//     cafeteria.isCafeteria = true;
//     let cafeteria_text = '';
//     let r = body('div[class="index_mlsv_box"]')
//       .children('div[class="text_contents"]')
//       .children('a')
//       .text()
//       .split('\n');
//     for (let i = 0; i < r.length; i++) {
//       let es = r[i].trim();
//       if (es.length >= 1) cafeteria_text += es + '\n';
//     }
//     if (cafeteria_img) cafeteria.img = new URL(cafeteria_img, 'https://hansei.sen.hs.kr/').href;
//     cafeteria.text = cafeteria_text;
//   }
//   return cafeteria;
// }
// async function sendCafeteriaInfo(chennel, author) {
//   let embeds = new discord_js_1.default.MessageEmbed()
//     .setColor(0x2eb9ff)
//     .setTitle('오늘의 급식')
//     .setDescription('급식 이미지 정보를 가져오고 있습니다...')
//     .setImage(default_menu_image)
//     .setFooter(author?.username ?? 'Automatic', author?.avatarURL() ?? '');
//   try {
//     let neis_cafe = await getCafetriaLib();
//     embeds.setTimestamp(Date.now()).addFields(
//       neis_cafe.map((menu) => {
//         return {
//           name: menu.name,
//           value: '알레르기: ' + (menu.allergys.join(' ') ?? '없음'),
//         };
//       }),
//     );
//     let message = await chennel.send({ embeds: [embeds] });
//     try {
//       let site_cafe = await getCafeteria();
//       embeds
//         .setDescription(site_cafe.text)
//         .setImage(site_cafe.isCafeteria ? site_cafe.img : default_menu_image)
//         .setTimestamp(Date.now());
//       if (site_cafe.isCafeteria && site_cafe.img.includes('selectImageView'))
//         embeds.addField('급식 이미지가 안보인다면?', `[급식 이미지](${site_cafe.img})`);
//       message.edit({ embeds: [embeds] });
//     } catch (err) {
//       app_1.Application.Log(`급식 이미지를 불러오지 못했습니다. ${err}`);
//     }
//   } catch (err) {
//     if (chennel.id == chennel_json_1.default.cafeteria_ch) return;
//     if (err?.includes('no data')) {
//       embeds.setColor(0xf10d6d).setDescription(`오늘은 급식이 없다구욥!`).setTimestamp(Date.now());
//       try {
//         let cat = await thecatapi_1.TheCatApi.get();
//         embeds.setImage(cat.url);
//       } catch {}
//     } else {
//       embeds
//         .setColor(0xff005d)
//         .setDescription(`급식 정보를 가져오지 못했습니다. ${err}`)
//         .setTimestamp(Date.now());
//     }
//     app_1.Application.Log(`cafeteria err: ${err}`);
//     chennel.send({ embeds: [embeds] });
//   }
// }
// function getProxyImage(url) {
//   return `https://cdn.imgproxify.com/image?url=${encodeURIComponent(url)}&mime=jpg`;
// }
// const allergys_infos = {
//   1: '난류',
//   2: '우유',
//   3: '메밀',
//   4: '땅콩',
//   5: '대두',
//   6: '밀',
//   7: '고등어',
//   8: '게',
//   9: '새우',
//   10: '돼지고기',
//   11: '복숭아',
//   12: '토마토',
//   13: '아황산류',
//   14: '호두',
//   15: '닭고기',
//   16: '쇠고기',
//   17: '오징어',
//   18: '조개류',
// };
// function getAllergyInfo(allergys) {
//   if (!allergys) return [];
//   let exists_num = [];
//   let als = [];
//   for (let i in allergys) {
//     let al_num = allergys[i];
//     let allergy = allergys_infos[al_num];
//     if (!allergy || exists_num.includes(al_num)) continue;
//     exists_num.push(al_num);
//     als.push(allergy);
//   }
//   return als;
// }
// //# sourceMappingURL=cafeteria.js.map
