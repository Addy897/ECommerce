/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const rawResponse = await fetch('http://127.0.0.1:8000/items/get/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Api-Token': 'random'
    },
  });
  let content = await rawResponse.json();
  content = Buffer.from(content.response, "base64").toString()
  content=JSON.parse(content)
  if (locals.user) {
    return { content: content, user: locals.user }
  }
  return { content: content }
}
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    let formData = await request.formData();
    let keyword = formData.get('keyword');
    if (keyword) {


      keyword = Buffer.from(keyword).toString("base64")
      const rawResponse = await fetch('http://127.0.0.1:8000/items/get/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Api-Token': 'random',
          'Keyword': keyword,
        },
      });

      let content = await rawResponse.json();
      content = Buffer.from(content.response, "base64").toString()
      content=JSON.parse(content)

      if (content.length) {
        
        return { sucess: true, content: content }
      }
      return { sucess: true }
    }
  },
};