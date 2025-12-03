'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  UserPlus,
  Mail,
  MoreVertical,
  Shield,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { fetchTeamMembers } from '@/lib/api-client';

interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer' | 'manager';
  status: 'active' | 'invited';
  company: string;
  avatarUrl: string | null;
  joinedAt: string;
  lastActive: string;
}

export default function TeamManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>('');
  const [canManage, setCanManage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'analyst' | 'viewer' | 'manager'>('viewer');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.push('/auth/signin');
        return;
      }

      await loadTeamMembers();
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamMembers = async () => {
    try {
      const response = await fetchTeamMembers();
      if (response.success) {
        setMembers(response.data);
        setCurrentUserRole(response.currentUserRole);
        setCanManage(response.canManage);
      }
    } catch (err: any) {
      console.error('Error loading team members:', err);
      setError('Failed to load team members');
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800 border-purple-200',
      manager: 'bg-blue-100 text-blue-800 border-blue-200',
      analyst: 'bg-green-100 text-green-800 border-green-200',
      viewer: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const icons = {
      admin: <Shield className="w-3 h-3" />,
      manager: <Users className="w-3 h-3" />,
      analyst: <Edit className="w-3 h-3" />,
      viewer: <Eye className="w-3 h-3" />,
    };

    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[role as keyof typeof styles]}`}>
        {icons[role as keyof typeof icons]}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <CheckCircle className="w-3 h-3" />
          Active
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
        <Clock className="w-3 h-3" />
        Invited
      </span>
    );
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    
    try {
      // TODO: Implement invite API
      console.log('Inviting:', inviteEmail, inviteRole);
      
      // For now, show success message
      alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('viewer');
      await loadTeamMembers();
    } catch (err: any) {
      console.error('Invite error:', err);
      alert('Failed to send invitation');
    } finally {
      setInviting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-1">
                Manage team members and their permissions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadTeamMembers}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              {canManage && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite Member
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{members.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.role === 'admin').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.status === 'invited').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  {canManage && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(member.role)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.lastActive}
                    </td>
                    {canManage && (
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Permission Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 font-medium text-gray-700">Feature</th>
                  <th className="text-center py-2 px-4 font-medium text-gray-700">Admin</th>
                  <th className="text-center py-2 px-4 font-medium text-gray-700">Manager</th>
                  <th className="text-center py-2 px-4 font-medium text-gray-700">Analyst</th>
                  <th className="text-center py-2 px-4 font-medium text-gray-700">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { feature: 'View Dashboard', admin: true, manager: true, analyst: true, viewer: true },
                  { feature: 'Export Reports', admin: true, manager: true, analyst: true, viewer: false },
                  { feature: 'Manage Members', admin: true, manager: true, analyst: false, viewer: false },
                  { feature: 'Manage Billing', admin: true, manager: false, analyst: false, viewer: false },
                  { feature: 'Connect APIs', admin: true, manager: false, analyst: true, viewer: false },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 text-gray-700">{row.feature}</td>
                    <td className="text-center py-2 px-4">
                      {row.admin ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : '-'}
                    </td>
                    <td className="text-center py-2 px-4">
                      {row.manager ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : '-'}
                    </td>
                    <td className="text-center py-2 px-4">
                      {row.analyst ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : '-'}
                    </td>
                    <td className="text-center py-2 px-4">
                      {row.viewer ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Invite Team Member</h2>
            <form onSubmit={handleInvite}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="colleague@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="viewer">Viewer - Read-only access</option>
                    <option value="analyst">Analyst - Can create reports and manage integrations</option>
                    <option value="manager">Manager - Can manage team members</option>
                    <option value="admin">Admin - Full access</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {inviting ? 'Sending...' : 'Send Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
