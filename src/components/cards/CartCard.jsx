import BorderButtonGreen from '../buttons/BorderButtonGreen';
import RemoveButton from '../buttons/RemoveButton';

const CartCard = ({
  item,
  setIsShowModal,
  setEditId,
  deleteCartItem,
  isOrdered,
}) => {
  return (
    <div className="space-y-4" key={item.id}>
      <div className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 soft-shadow group hover:border-emerald-200 transition">
        <div className="w-24 h-20 bg-emerald-50 rounded-xl flex-shrink-0 relative overflow-hidden">
          <img
            src={item.product.imageUrl}
            alt={item.product.imagesUrl[0]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-6 flex-1">
          <h3 className="font-bold text-gray-800">{item.product.title}</h3>
          <p className="text-gray-400 text-sm">
            單價：NT$ {item.product.price.toLocaleString()} / 小時
          </p>
          <p className="text-gray-400 text-sm">
            授課教師：{item.product.imagesUrl[0]}
          </p>
          <div className="py-2">
            <div className="text-sm font-medium text-gray-500 pb-1">
              購買時數：{item.qty} 小時
              {!isOrdered && (
                <BorderButtonGreen
                  classFont={'text-xs'}
                  classSpace={'py-1 px-2 ml-4'}
                  classColor={
                    'text-emerald-500 hover:text-emerald-600 hover:cursor-pointer border-emerald-500 hover:border-emerald-600'
                  }
                  text={'修改時數'}
                  clickFunc={() => {
                    setEditId(item.id);
                    setTimeout(() => {
                      setIsShowModal(true);
                    }, 0);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div></div>
        <div className="text-right w-28">
          <span className="block font-bold text-emerald-600 text-lg">
            NT$ {item.total.toLocaleString()}
          </span>
          {!isOrdered && (
            <RemoveButton
              text={'刪除課程'}
              clickFunc={() => deleteCartItem(item.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
