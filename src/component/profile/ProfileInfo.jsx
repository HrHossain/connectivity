import EditIcon from "../../assets/icons/edit.svg"
import Avatar from "../../assets/images/avatars/avatar_1.png"
const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
          
          <div
            className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
          >
            <img
              className="max-w-full"
              src={Avatar}
              alt="sumit saha"
            />

            <button
              className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            >
            <img src={EditIcon} alt="Edit" />
            </button>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              Mofazzel Hossain
            </h3>
            <p className="leading-[231%] lg:text-lg">mofazzel@gmail.com</p>
          </div>

          
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore eius qui rem laboriosam quisquam, ad consectetur expedita. Facere expedita nulla blanditiis recusandae. Quaerat praesentium dolorum ullam, eos sapiente fugit perspiciatis soluta facilis magnam, quisquam quae officiis sit, fuga ut. Magni quas voluptate odit minus soluta exercitationem doloribus, a officiis possimus officia vitae repellat dolor, aperiam, ducimus quod reprehenderit ex. Hic nobis repudiandae nulla omnis nisi voluptas corporis. Omnis vel quo placeat magnam rem iusto facilis. In aut nesciunt tempore, deserunt ducimus consectetur at explicabo! Tenetur repudiandae nulla doloremque hic ipsa consequuntur omnis, ullam harum doloribus aperiam laboriosam veniam iure laborum, nostrum iste expedita ratione libero. Ex voluptatum aut accusamus! Ut nostrum eum laudantium hic odio, iusto iste, officia ullam, laborum voluptas numquam omnis quaerat modi nihil? Facere numquam porro quibusdam?
              </p>
            </div>
            
            <button className="flex-center h-7 w-7 rounded-full">
              <img src={EditIcon} alt="Edit" />
            </button>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        
  )
}

export default ProfileInfo