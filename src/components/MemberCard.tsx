import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';

interface MemberCardProps {
    member: any;
    index: number;
    isCurrentUser?: boolean;
    onDelete?: (id: string) => void;
}

export default function MemberCard({ member, index, isCurrentUser, onDelete }: MemberCardProps) {
    const { user } = useAuth();
    const isLeader = member.role === 'Guild Leader' || member.role === 'Guild Queen';
    const displayName = member.name || 'Anonymous Member';
    const photoUrl = member.photoUrl || (member.uid ? `https://api.dicebear.com/9.x/avataaars/svg?seed=${member.uid}` : (member.image || `https://api.dicebear.com/9.x/avataaars/svg?seed=${displayName}`));
    const isAdmin = user?.email === 'navilatayeba09@gmail.com';

    return (
        <div
            className={`member-card gaming-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative flex flex-col h-auto ${isLeader ? 'col-span-2 lg:col-span-4 lg:w-1/3 lg:mx-auto md:h-[550px]' : 'md:h-[420px] lg:h-[480px] group'}`}
            data-aos="zoom-in"
            data-aos-delay={index * 50}
        >
            <div className={`h-auto aspect-[3/4] md:aspect-auto md:h-[70%] w-full bg-[#0a0a0a] overflow-hidden relative ${isLeader ? 'border-b-2 border-primary' : 'border-b border-primary/20'} rounded-t-[2rem]`}>
                <img
                    src={photoUrl}
                    alt={displayName}
                    className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://api.dicebear.com/9.x/avataaars/svg?seed=PinkGamer';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-5 right-5 flex flex-col gap-3 z-20">
                    {isCurrentUser && (
                        <Link
                            href="/profile"
                            className="bg-primary/90 hover:bg-primary text-white p-2.5 rounded-xl shadow-glow backdrop-blur-md transition-all hover:scale-110 flex items-center justify-center border border-white/10"
                            title="Edit Your Profile"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                    )}
                    {isAdmin && (
                        <button
                            onClick={() => onDelete?.(member.id)}
                            className="bg-red-500/90 hover:bg-red-500 text-white p-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.4)] backdrop-blur-md transition-all hover:scale-110 flex items-center justify-center border border-white/10"
                            title="Delete Member"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    )}
                </div>
            </div>

            <div className={`h-auto md:h-[30%] bg-transparent w-full p-3 md:p-8 relative z-10 flex flex-col justify-center items-center ${isLeader ? '' : 'md:items-start'} rounded-b-[1.5rem] md:rounded-b-[2rem] min-h-[90px] md:min-h-[100px]`}>
                <h3 className={`font-display font-black italic skew-x-[-10deg] leading-tight mb-1 md:mb-2 uppercase tracking-tight text-white ${isLeader ? 'text-xl md:text-3xl' : 'text-sm md:text-2xl'} ${isLeader ? '' : 'text-center md:text-left'} text-glow`}>
                    {displayName}
                </h3>
                {isLeader ? (
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase border border-primary/30 shadow-glow-sm">
                        <span className="material-symbols-outlined text-sm">grade</span>
                        {member.role}
                    </div>
                ) : (
                    <div className="flex flex-col md:items-start items-center">
                        <p className="text-white/40 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-1">
                            {member.role || "Member"}
                        </p>
                        {member.gameUid && (
                            <p className="text-primary/70 text-[9px] md:text-[11px] font-mono border-l border-primary/30 pl-3 mt-1 font-bold">
                                ID: {member.gameUid}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
