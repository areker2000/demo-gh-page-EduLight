import type { ITeacher } from '../../types/teachers';

interface IOrderCard {
  item: ITeacher;
  qty: number;
}

const OrderCard = ({ item, qty }: IOrderCard) => {
  console.log(item);

  return (
    <div className="space-y-4" key={item.id}>
      <div className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 soft-shadow group hover:border-emerald-200 transition">
        <div className="w-24 h-20 bg-emerald-50 rounded-xl flex-shrink-0 relative overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-6 flex-1">
          <h3 className="font-bold text-gray-800">{item.title}</h3>
          <p className="text-gray-400 text-sm">
            單價：NT$ {item.price.toLocaleString()} / 小時
          </p>
          <p className="text-gray-400 text-sm">授課教師：{item.imagesUrl[0]}</p>
          <div className="py-2">
            <div className="text-sm font-medium text-gray-500 pb-1">
              購買時數：{qty} 小時
            </div>
          </div>
        </div>
        <div></div>
        <div className="text-right w-28">
          <span className="block font-bold text-emerald-600 text-lg">
            NT$ {item.price * qty}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
