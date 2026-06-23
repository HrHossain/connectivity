import EditIcon from "../../assets/icons/edit.svg"
import DeleteIcon from "../../assets/icons/delete.svg"
const UserAction = () => {
  return (
    <div className="action-modal-container">
        <button className="action-menu-item hover:text-lwsGreen">
        <img src={EditIcon} alt="Edit" />
        Edit
        </button>
        <button className="action-menu-item hover:text-red-500">
        <img src={DeleteIcon} alt="Delete" />
        Delete
        </button>
    </div>
  )
}

export default UserAction