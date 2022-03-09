const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

const create = async (graspData) => {
  try {
    let response = await fetch('/api/grasps/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(graspData)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const list = async () => {
  try {
    let response = await fetch('/api/grasps/', {
      method: 'GET',
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (graspId) => {
  try {
    let response = await fetch('/api/grasps/' + graspId, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  list,
  remove,
}