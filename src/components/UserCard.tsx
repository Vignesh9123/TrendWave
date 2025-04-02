'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { User2 } from 'lucide-react';
import { getSearchHistory } from '@/app/actions';
import Image from 'next/image';
export function UserCard(){
    const {data: session} = useSession();
    const router = useRouter();
    const executeSearch = async (query: string) => {
        router.push(`/results?query=${encodeURIComponent(query)}`);
    }
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    useEffect(() => {
        const localHistory = localStorage.getItem('recentSearches')
        if(localHistory){
            setSearchHistory(JSON.parse(localHistory).slice(0, 5))
        }
        else {
            const fetchHistory = async () => {
                const history = await getSearchHistory();
                setSearchHistory(history)
                localStorage.setItem('recentSearches', JSON.stringify(history))
            }
            fetchHistory();
        }
    }, []);
    return(
       <Card>
        <CardContent>
            <div className='flex items-center gap-2'>
                <div>
                    {session?.user?.image ? <Image src={session?.user?.image} alt="User" width={50} height={50}/>
                    : <User2 className="w-10 h-10"/>
                    }
                   
                </div>
                <div>
                        <p className="font-medium">{session?.user?.name}</p>
                        <p className="text-muted-foreground">{session?.user?.email}</p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-medium my-2">Your Recent Searches</h3>
                {searchHistory.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                        {searchHistory.map((search, index) => (
                            <p key={index} onClick={() => executeSearch(search)} className="bg-muted text-foreground px-2 py-1 cursor-pointer rounded">{search}</p>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">No search history</p>
                )}
            </div>
        </CardContent>
       </Card>
    )
}