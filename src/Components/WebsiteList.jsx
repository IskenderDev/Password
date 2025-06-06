import React from 'react'

const WebsiteList = ({ websites, onDelete }) => {
  const handleDelete = (index) => {
    onDelete(index)
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Website List</h1>
      <ul className='space-y-4'>
        {websites.map((website, index) => (
          <li
            key={index}
            className='flex items-center space-x-4 border-b pb-2 relative'
          >
            <img
              src={`https://www.${website.website}.com/favicon.ico`}
              alt=''
              onError={(e) => {
                e.target.src =
                  'https://img.icons8.com/color/48/internet--v1.png'
              }}
              className='w-8 h-8 rounded-full'
            />
            <div className='flex-1'>
              <a
                href={`http://www.${website.website}.com`}
                target='_blank'
                className='text-blue-500 hover:underline'
              >
                {`www.${website.website}.com`}
              </a>

              <div className='text-gray-500 text-sm'>
                Username: {website.username}
                <br />
                Password: {website.password}
              </div>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className='absolute top-0 right-0 text-red-500 hover:text-red-700 cursor-pointer'
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WebsiteList
