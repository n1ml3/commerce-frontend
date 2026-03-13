const AdminDashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Tổng Quan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Tổng Doanh Thu</p>
                        <h3 className="text-2xl font-bold text-gray-900">145,500,000 ₫</h3>
                    </div>
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Tổng Đơn Hàng</p>
                        <h3 className="text-2xl font-bold text-gray-900">145</h3>
                    </div>
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Người Dùng Kích Hoạt</p>
                        <h3 className="text-2xl font-bold text-gray-900">2,400</h3>
                    </div>
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h2 className="text-xl font-bold text-gray-900 mb-4">Hoạt Động Gần Đây</h2>
                 <p className="text-gray-500">Không có hoạt động nào để hiển thị.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
