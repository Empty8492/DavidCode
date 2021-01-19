using Coreapi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Coreapi
{
    public class SQLcmd
    {
        public static List<Users> SQLcmdData()
        {
            string sql = "Data Source = DESKTOP-F7VMHLU\\EMPTY;Initial Catalog = ck_DB;User Id = sa;Password = lenxin;";
            string querystring = "select * from tb_Users";
            List<Users> mList = new List<Users>();
            using (SqlConnection conn = new SqlConnection(sql))
            {
                SqlCommand cmd = new SqlCommand(querystring, conn);
                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Users u = new Users();
                        u.ID = (int)reader[0];
                        u.January = (int)reader[1];
                        u.February = (int)reader[2];
                        u.March = (int)reader[3];
                        u.Name = reader[4].ToString();
                        mList.Add(u);
                    }
                }
            }
            return mList;
        }
        public static List<Users> SQLcmdData(int id)
        {
            string sql = "Data Source = DESKTOP-F7VMHLU\\EMPTY;Initial Catalog = ck_DB;User Id = sa;Password = lenxin;";
            string querystring = string.Format("select * from tb_Users where ID={0}", id);
            List<Users> mList = new List<Users>();
            using (SqlConnection conn = new SqlConnection(sql))
            {
                SqlCommand cmd = new SqlCommand(querystring, conn);
                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Users u = new Users();
                        u.ID = (int)reader[0];
                        u.January = (int)reader[1];
                        u.February = (int)reader[2];
                        u.March = (int)reader[3];
                        u.Name = reader[4].ToString();
                        mList.Add(u);
                    }
                }
            }
            return mList;
        }
        public static int SQLinsertData(int January, int February, int March, string Name)
        {
            string sql = "Data Source = DESKTOP-F7VMHLU\\EMPTY;Initial Catalog = ck_DB;User Id = sa;Password = lenxin;";
            string querystring = string.Format("INSERT INTO tb_Users VALUES('{0}','{1}','{2}','{3}')", January, February, March, Name);
            using (SqlConnection conn = new SqlConnection(sql))
            {
                SqlCommand cmd = new SqlCommand(querystring, conn);
                conn.Open();
                int a = cmd.ExecuteNonQuery();
                if (a > 0)
                {
                    return a;
                }
                else { return 0; };
            }
        }
        public static int SQLUpdateData(int January, int February, int March, int Id)
        {
            string sql = "Data Source = DESKTOP-F7VMHLU\\EMPTY;Initial Catalog = ck_DB;User Id = sa;Password = lenxin;";
            string querystring = string.Format("update tb_Users set January ={0} ,February={1},March={2} where ID={3}", January, February, March, Id);
            using (SqlConnection conn = new SqlConnection(sql))
            {
                SqlCommand cmd = new SqlCommand(querystring, conn);
                conn.Open();
                int a = cmd.ExecuteNonQuery();
                if (a > 0)
                {
                    return a;
                }
                else { return 0; };
            }
        }
        public static int SQLDeleteData(int Id)
        {
            string sql = "Data Source = DESKTOP-F7VMHLU\\EMPTY;Initial Catalog = ck_DB;User Id = sa;Password = lenxin;";
            string querystring = string.Format("delete from tb_Users where ID={0}", Id);
            using (SqlConnection conn = new SqlConnection(sql))
            {
                SqlCommand cmd = new SqlCommand(querystring, conn);
                conn.Open();
                int a = cmd.ExecuteNonQuery();
                if (a > 0)
                {
                    return a;
                }
                else { return 0; };
            }
        }
        public static List<Users> SQLcmdSearch(string Name)
        {
            string sql = "Data Source = DESKTOP-F7VMHLU\\EMPTY;Initial Catalog = ck_DB;User Id = sa;Password = lenxin;";
            string querystring = string.Format("select * from tb_Users where Name like '%{0}%'", Name);
            List<Users> mList = new List<Users>();
            using (SqlConnection conn = new SqlConnection(sql))
            {
                SqlCommand cmd = new SqlCommand(querystring, conn);
                conn.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Users u = new Users();
                        u.ID = (int)reader[0];
                        u.January = (int)reader[1];
                        u.February = (int)reader[2];
                        u.March = (int)reader[3];
                        u.Name = reader[4].ToString();
                        mList.Add(u);
                    }
                }
            }
            return mList;
        }
        //select * from tb_Users where Name like '%国%'
    }
}
