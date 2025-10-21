import { MapPin, Plus, Edit } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface OwnerDashboardProps {
  onClose: () => void;
}

export const OwnerDashboard = ({ onClose }: OwnerDashboardProps) => {
  const ownerLots = [
    {
      id: 1,
      name: 'חניון הבימה',
      address: 'רחוב הבימה 5, תל אביב',
      currentPrice: 15,
      spots: 120,
      occupied: 87,
    },
    {
      id: 2,
      name: 'חניון דיזנגוף סנטר',
      address: 'דיזנגוף 50, תל אביב',
      currentPrice: 25,
      spots: 200,
      occupied: 156,
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl">פאנל בעלי חניונים</h1>
          <Button variant="secondary" size="sm" onClick={onClose}>
            חזור לאפליקציה
          </Button>
        </div>
        <p className="text-blue-100">
          נהל את החניונים שלך ועדכן מחירים בזמן אמת
        </p>
      </div>

      <div className="p-4 space-y-4">
        <Tabs defaultValue="lots" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="lots">החניונים שלי</TabsTrigger>
            <TabsTrigger value="add">הוסף חניון</TabsTrigger>
          </TabsList>

          <TabsContent value="lots" className="space-y-4 mt-4">
            {ownerLots.map((lot) => {
              const occupancyRate = (lot.occupied / lot.spots) * 100;
              return (
                <Card key={lot.id} className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-medium">{lot.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{lot.address}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 ml-1" />
                      ערוך
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl text-blue-600">
                        ₪{lot.currentPrice}
                      </div>
                      <div className="text-xs text-gray-500">מחיר לשעה</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">
                        {lot.occupied}/{lot.spots}
                      </div>
                      <div className="text-xs text-gray-500">מקומות תפוסים</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-green-600">
                        {occupancyRate.toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-500">תפוסה</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`price-${lot.id}`}>עדכן מחיר לשעה</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`price-${lot.id}`}
                        type="number"
                        defaultValue={lot.currentPrice}
                        className="text-right"
                        dir="rtl"
                      />
                      <Button variant="default">עדכן</Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="add" className="mt-4">
            <Card className="p-6 space-y-4">
              <h3 className="font-medium">הוסף חניון חדש</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">שם החניון</Label>
                  <Input
                    id="name"
                    placeholder="לדוגמה: חניון הבימה"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">כתובת</Label>
                  <Input id="address" placeholder="רחוב ומספר, עיר" dir="rtl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">מחיר לשעה (₪)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="15"
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spots">מספר מקומות</Label>
                    <Input
                      id="spots"
                      type="number"
                      placeholder="100"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">שעות פעילות</Label>
                  <Input id="hours" placeholder="24/7" dir="rtl" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון</Label>
                  <Input id="phone" placeholder="03-1234567" dir="rtl" />
                </div>

                <Button className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  הוסף חניון
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
